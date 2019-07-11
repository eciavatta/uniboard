//DB must be uniboard
db.createUser(
  {
    user: "uniboard",
    pwd: "uniboard",
    roles: [
      {
        role: "readWrite",
        db: "uniboardDB"
      }
    ]
  }
);
