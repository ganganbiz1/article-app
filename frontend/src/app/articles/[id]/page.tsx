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
    <Container maxWidth="sm">
      <Box my={4}>
        <Card>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom>
              {article.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {article.created_at}
            </Typography>
            <Typography variant="body1" mt={2}>
              {article.content}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
} 