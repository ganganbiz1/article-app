"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

interface Article {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

export default function ArticleDetailPage() {
  const params = useParams();
  const { id } = params as { id: string };
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    fetch(`/api/articles/${id}`)
      .then((res) => res.json())
      .then((data) => setArticle(data));
  }, [id]);

  if (!article) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(120deg, #f5f7fa 0%, #c3cfe2 100%)", py: 8 }}>
      <Container maxWidth="sm">
        <Card sx={{ borderRadius: 4, boxShadow: 6 }}>
          <CardContent>
            <Typography variant="h4" component="h1" fontWeight={700} gutterBottom align="center">
              {article.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>
              {new Date(article.created_at).toLocaleString("ja-JP", { dateStyle: "medium", timeStyle: "short" })}
            </Typography>
            <Typography variant="body1" color="text.primary" sx={{ whiteSpace: "pre-line", fontSize: 18, lineHeight: 1.8 }}>
              {article.content}
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
} 