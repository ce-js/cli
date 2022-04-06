interface File {
  directory: string | null
  content: string
}

const files: { [key: string]: File } = {}

files["/pages/index.html"] = {
  directory: "pages",
  content: `<h1>hi</h1>`,
}

files["run.ts"] = {
  directory: null,
  content: ``,
}

export default files
