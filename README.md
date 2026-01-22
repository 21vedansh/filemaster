# Filemaster

Filemaster is a simple Node.js CLI tool to manage files using basic commands.  
It allows you to create, write, read, and delete files directly from the terminal.

Built as a learning project to practice:

- Node.js `fs` module
- CLI arguments
- readline interface
- File system operations

## Features

- Create new files
- Write content into files
- Read file content
- Delete files with confirmation
- Built-in help command

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/filemaster.git
cd filemaster
```

## Usage

Run the CLI using Node:

```bash
node index.js <command> <filename>
```

### Available Commands

Create a new file:

```bash
node index.js create test.txt
```

Write content into a file:
(Type your content and press Enter on an empty line to save)

```bash
node index.js write test.txt
```

Read a file:

```bash
node index.js read test.txt
```

Delete a file:

```bash
node index.js delete test.txt
```

Show help menu:

```bash
node index.js help
```

## File Storage

All files are automatically stored inside a folder created by the tool:

```bash
/files
```
