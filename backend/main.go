package main

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/go-chi/chi/v5"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type Article struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	Title     string    `json:"title"`
	Content   string    `json:"content"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

var db *gorm.DB

func main() {
	var err error
	// DB接続情報を環境変数から取得
	dsn := os.Getenv("DB_USER") + ":" + os.Getenv("DB_PASSWORD") + "@tcp(" + os.Getenv("DB_HOST") + ":" + os.Getenv("DB_PORT") + ")/" + os.Getenv("DB_NAME") + "?charset=utf8mb4&parseTime=True&loc=Local"
	db, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("failed to connect database: ", err)
	}
	// マイグレーション
	db.AutoMigrate(&Article{})

	r := chi.NewRouter()
	r.Get("/articles", getArticles)
	r.Post("/articles", createArticle)
	r.Get("/articles/{id}", getArticleByID)

	log.Println("Backend server started on :8080")
	http.ListenAndServe(":8080", r)
}

func getArticles(w http.ResponseWriter, r *http.Request) {
	var articles []Article
	db.Order("created_at desc").Find(&articles)
	respondJSON(w, http.StatusOK, articles)
}

func createArticle(w http.ResponseWriter, r *http.Request) {
	var article Article
	if err := decodeJSONBody(w, r, &article); err != nil {
		return
	}
	article.CreatedAt = time.Now()
	article.UpdatedAt = time.Now()
	db.Create(&article)
	respondJSON(w, http.StatusCreated, article)
}

func getArticleByID(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	var article Article
	if err := db.First(&article, id).Error; err != nil {
		respondJSON(w, http.StatusNotFound, map[string]string{"error": "Article not found"})
		return
	}
	respondJSON(w, http.StatusOK, article)
}

func respondJSON(w http.ResponseWriter, status int, payload interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(payload)
}

func decodeJSONBody(w http.ResponseWriter, r *http.Request, dst interface{}) error {
	dec := json.NewDecoder(r.Body)
	dec.DisallowUnknownFields()
	if err := dec.Decode(dst); err != nil {
		respondJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid request body"})
		return err
	}
	io.Copy(io.Discard, r.Body) // 残りを捨てる
	return nil
}
