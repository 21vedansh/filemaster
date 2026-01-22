#!/usr/bin/env node

const fs = require("fs");
const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");
const path = require("path");

const command = process.argv[2];
const fileName = process.argv[3];

const dirPath = path.join(__dirname, "files");

function showHelp() {
  console.log(`Filemaster CLI v1.0.0
Simple CLI tool to manage files

Usage: 
    filemaster <command> <filename>
      
Commands: 
    create <filename>   Create a new empty file
    write <filename>    Write content into a file
    read <filename>     Read a file
    delete <filename>   Delete a file
    help                Show this help menu`);
}

if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
}

if (
  !command ||
  command === "help" ||
  command === "-h" ||
  command === "--help"
) {
  showHelp();
} else if (command === "create" && fileName !== undefined) {
  try {
    fs.writeFileSync(`./files/${fileName}`, "");

    console.log(`file ${fileName} has been created successfully!`);
  } catch (err) {
    console.log("Error creating file: ", err.message);
  }
} else if (command === "write" && fileName !== undefined) {
  const rl = readline.createInterface({
    input,
    output,
  });

  console.log("Start typing. Press Enter on empty line to finish:");

  let wholeText = "";

  rl.on("line", (line) => {
    if (line === "") {
      try {
        fs.writeFileSync(`./files/${fileName}`, wholeText);
        console.log(`file ${fileName} has been written successfully!`);
      } catch (err) {
        console.log("Error writing file: ", err.message);
      }
      rl.close();
    } else {
      wholeText += line + "\n";
    }
  });
} else if (command === "read" && fileName !== undefined) {
  const filePath = path.join(dirPath, fileName);
  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");

    console.log(fileContent);
  } catch (err) {
    console.log("Error reading file: ", err.message);
  }
} else if (command === "delete" && fileName !== undefined) {
  const filePath = path.join(dirPath, fileName);

  const rl = readline.createInterface({
    input,
    output,
  });

  rl.question(
    `Are you sure you want to delete ${fileName} (y/n): `,
    (answer) => {
      if (answer.toLowerCase() === "y" || answer.trim() === "") {
        try {
          fs.unlinkSync(filePath);
        } catch (err) {
          console.log("Error deleting file: ", err.message);
        }
        console.log(`${fileName} deleted successfully!`);
      } else {
        console.log("Canceled!");
      }
      rl.close();
    },
  );
} else {
  if (!command) {
    console.log("Please enter a command (create, write, read, delete)");
  } else if (!fileName) {
    console.log("Please enter filename with extension");
  } else {
    console.log("Invalid command");
  }
}
