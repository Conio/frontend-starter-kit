import chalk from "chalk";
import { error, info, log, warn } from "console";

export class Logger {
  public static error(message: string): void {
    error(`${chalk.redBright("[mock]")} ${message}`);
  }

  public static info(message: string): void {
    info(`${chalk.blueBright("[mock]")} ${message}`);
  }

  public static log(message: string): void {
    log(`${chalk.blueBright("[mock]")} ${message}`);
  }

  public static warn(message: string): void {
    warn(`${chalk.yellowBright("[mock]")} ${message}`);
  }
}
