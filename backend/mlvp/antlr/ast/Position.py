class Point:

    def __init__(self, line, column):
        self.line = line
        self.column = column


class Position:

    def __init__(self, ctx):
        self.start = Point(ctx.getStart().getLine(), ctx.getStart().getCharPositionInLine())
        self.column = Point(ctx.getStop().getLine(), ctx.getStop().getCharPositionInLine())
