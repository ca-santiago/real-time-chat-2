export const saveUserId = (req: any, payload: string) => {
  req.metadata = {};
  req.metadata["userId"] = payload;
};

export const getUserId = (req: any) => {
  if (!req.metadata) {
    throw new Error(
      "You should use middlewares.validateToken to have access to userId"
    );
  }
  return req.metadata["userId"] || null;
};
