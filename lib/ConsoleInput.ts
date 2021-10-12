import readlineSync = require('readline-sync');

export class ConsoleInput {
  public static readLine(text, nullable = false): string {
    let answer;

    do {
      answer = readlineSync.question(text);
    } while (!answer && !nullable);

    return answer.length ? answer : undefined;
  }

  public static readLineNumber(promptText, nullable = false): number | undefined {
    try {
      return +this.readLine(promptText, nullable);
    } catch (e) {
      return undefined;
    }
  }
}