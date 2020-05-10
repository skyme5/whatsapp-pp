function formatDate() {
  return new Date().toJSON().replace(/:/g, "-").split(".")[0];
}
