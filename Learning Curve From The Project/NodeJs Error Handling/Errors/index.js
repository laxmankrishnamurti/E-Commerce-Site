async function sayHello() {
  try {
    throw new Error(
      "sayHello fun :: Program failed",
      "Database insertion failed"
    );
  } catch (error) {
    console.log("Error : ", error);
    console.log("Error name : ", error.name);
    console.log("Error message : ", error.message);
    console.log("Error stack : ", error.stack);
  }
}
sayHello();
