import app from './app';

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`API Gateway running  http://localhost:${PORT}`);
});
