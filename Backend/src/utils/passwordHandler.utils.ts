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
): Promise<boolean> => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

export { passwordEncryptionHandler, passwordDecryptionHandler };
