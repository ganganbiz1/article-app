"use client";
import React, { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export default function PostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    setLoading(false);
    router.push("/");
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(120deg, #f5f7fa 0%, #c3cfe2 100%)", py: 8 }}>
      <Container maxWidth="sm">
        <Card sx={{ borderRadius: 4, boxShadow: 6 }}>
          <CardContent>
            <Typography variant="h4" component="h1" fontWeight={700} gutterBottom align="center">
              記事投稿
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="タイトル"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                required
                margin="normal"
                sx={{ fontWeight: 700 }}
              />
              <TextField
                label="本文"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                fullWidth
                required
                margin="normal"
                multiline
                minRows={6}
                sx={{ fontWeight: 400 }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                sx={{ mt: 3, fontWeight: 700, fontSize: 18, px: 4, py: 1.5, borderRadius: 8, boxShadow: 2, width: "100%" }}
              >
                投稿
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
} 