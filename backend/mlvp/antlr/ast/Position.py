class Point:

    def __init__(self, line, column):
        self.line = line
        self.column = column


class Position:

    def __init__(self, ctx):
        # TODO
        # self.start = Point(ctx.getSymbol().start.getLine(), ctx.getStart().getCharPositionInLine())
        # self.column = Point(ctx.getStop().getLine(), ctx.getStop().getCharPositionInLine())
        self.start = 0
        self.end = 0
