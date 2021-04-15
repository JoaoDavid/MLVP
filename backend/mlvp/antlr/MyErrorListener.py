from antlr4.error.ErrorListener import ErrorListener


class MyErrorListener(ErrorListener):

    def __init__(self):
        self.list_errors = []

    def syntaxError(self, recognizer, offendingSymbol, line, column, msg, e):
        self.list_errors.append("line " + str(line) + ":" + str(column) + " " + msg)

    def reportAmbiguity(self, recognizer, dfa, startIndex, stopIndex, exact, ambigAlts, configs):
        print("Ambiguity ERROR, " + str(configs))

    def reportAttemptingFullContext(self, recognizer, dfa, startIndex, stopIndex, conflictingAlts, configs):
        print("Attempting full context ERROR, " + str(configs))

    def reportContextSensitivity(self, recognizer, dfa, startIndex, stopIndex, prediction, configs):
        print("Context ERROR, " + str(configs))
