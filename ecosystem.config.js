module.exports = {
  apps: [
    {
      name: "trendyfashionzone",
      cwd: "/var/www/sites/trendyfashionzone.co.ke",
      script: "npm",
      args: "run start",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
      },
      max_memory_restart: "300M",
    },
  ],
};
