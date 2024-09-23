import bcrypt from "bcrypt";
import CustomErrorClass from "./customErrorClass.utils.ts";

const passwordEncryptionHandler = async (
  plainPassword: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(plainPassword, 11, (error, hash) => {
      if (error) {
        return reject(
          new CustomErrorClass(500, "Errror occured while hashing password")
        );
      }
      resolve(hash);
    });
  });
};

const passwordDecryptionHandler = (
  plainPassword: string,
  hashedPassword: string
) => {
  bcrypt.compare(plainPassword, hashedPassword, function (error, result) {
    if (error) {
      throw new CustomErrorClass(500, "Password validation error by bcrypt");
    }
    return result;
  });
};

export { passwordEncryptionHandler, passwordDecryptionHandler };
