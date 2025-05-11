"use client";
import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Link from "next/link";

interface Article {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch("/api/articles")
      .then((res) => res.json())
      .then((data) => setArticles(data));
  }, []);

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          記事一覧
        </Typography>
        <Button variant="contained" color="primary" component={Link} href="/post">
          新規投稿
        </Button>
        <Box mt={4}>
          {articles.map((article) => (
            <Card key={article.id} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h5" component={Link} href={`/articles/${article.id}`} color="primary">
                  {article.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {article.created_at}
                </Typography>
                <Typography variant="body1" mt={2}>
                  {article.content.length > 100 ? article.content.slice(0, 100) + "..." : article.content}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
