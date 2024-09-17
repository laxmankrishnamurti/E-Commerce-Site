async function sayHello() {
  try {
    throw new Error("sayHello fun :: Program failed");
  } catch (error) {
    console.log("Error : ", error);
    console.log("Error name : ", error.name);
    console.log("Error message : ", error.message);
    console.log("Error stack : ", error.stack);
    let allErrorKeys = [];
    for (let key in error) {
      allErrorKeys.push(key);
    }
    console.log("allErrorKeys are : ", allErrorKeys);
  }
}

sayHello();
