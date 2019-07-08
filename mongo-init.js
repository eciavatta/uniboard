db.createUser(
  {
    user: "uniboard",
    pwd: "braobiun",
    roles: [
      {
        role: "readWrite",
        db: "uniboard"
      }
    ]
  }
);
