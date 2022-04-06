import chalkin from "https://deno.land/x/chalkin@v0.1.3/mod.ts"
import * as path from "https://deno.land/std@0.133.0/path/mod.ts"
import files from "./files.ts"

export default (cwd: string, projects: string[]) => {
  if (projects.length < 1)
    throw new Error(
      chalkin.underline.redBright(
        "At least, you should provide a project name, provide . to create in current directory"
      )
    )

  console.log(chalkin.cyanBright("I'll create your cool project!"))

  projects.map(async (name) => {
    name !== "." && Deno.mkdirSync(path.join(cwd, name))
    Object.entries(files).map(([fullFilePath, file]) => {
      const before = Date.now()
      if (file.directory) Deno.mkdirSync(path.join(cwd, name, file.directory))
      const filePath = path.join(
        cwd,
        name,
        file.directory ?? "",
        fullFilePath.split("/").at(-1) ?? ""
      )
      Deno.writeTextFileSync(filePath, file.content)
      console.log(
        chalkin.greenBright("Created"),
        `${filePath}!`,
        `${(Date.now() - before).toLocaleString()}ms`
      )
    })
  })
}
