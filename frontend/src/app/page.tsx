"use client";
import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Link from "next/link";
import Stack from "@mui/material/Stack";

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
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(120deg, #f5f7fa 0%, #c3cfe2 100%)" }}>
      <Box sx={{ py: 8, textAlign: "center", background: "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)", color: "#fff", mb: 6, boxShadow: 3 }}>
        <Typography variant="h2" fontWeight={700} letterSpacing={2} gutterBottom>
          記事アプリ
        </Typography>
        <Typography variant="h5" fontWeight={400}>
          Next.js × Go × MySQL モダン記事投稿サービス
        </Typography>
        <Button variant="contained" color="secondary" component={Link} href="/post" sx={{ mt: 4, fontWeight: 700, fontSize: 18, px: 4, py: 1.5, borderRadius: 8, boxShadow: 2 }}>
          新規投稿
        </Button>
      </Box>
      <Container maxWidth="md">
        <Stack spacing={3}>
          {articles.map((article) => (
            <Card key={article.id} sx={{ transition: "0.2s", '&:hover': { boxShadow: 8, transform: 'translateY(-4px) scale(1.01)' }, borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h5" fontWeight={700} sx={{ textDecoration: "none", '&:hover': { textDecoration: "underline" } }}>
                  <Link href={`/articles/${article.id}`} style={{ color: "inherit", textDecoration: "none" }}>
                    {article.title}
                  </Link>
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {new Date(article.created_at).toLocaleString("ja-JP", { dateStyle: "medium", timeStyle: "short" })}
                </Typography>
                <Typography variant="body1" mt={2} color="text.primary" sx={{ mt: 2 }}>
                  {article.content.length > 100 ? article.content.slice(0, 100) + "..." : article.content}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
