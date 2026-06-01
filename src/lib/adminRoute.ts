export const ADMIN_BASE_PATH = "/x-control-9x7-panel";

export const adminRoute = (path = "") => {
  const normalizedPath = path.replace(/^\/+/, "");
  return normalizedPath ? `${ADMIN_BASE_PATH}/${normalizedPath}` : ADMIN_BASE_PATH;
};
