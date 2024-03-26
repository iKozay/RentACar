export default function isSelected(name) {
  const storedBranch = JSON.parse(localStorage.getItem("branch"));
  return storedBranch && name === storedBranch.name;
}
