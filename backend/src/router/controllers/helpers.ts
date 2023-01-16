export const saveUserId = (req: any, payload: string) => {
  req.metadata = {};
  req.metadata["userId"] = payload;
};

export const getUserId = (req: any) => {
  if (!req.metadata) {
    throw new Error(
      "You should should use the validateToken middleware to access the user id"
    );
  }
  return req.metadata["userId"] || null;
};
