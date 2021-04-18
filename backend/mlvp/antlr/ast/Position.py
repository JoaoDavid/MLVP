class Position:

    def __init__(self, ctx):
        self.start_line = ctx.start.line
        self.start_column = ctx.start.column
        self.stop_line = ctx.stop.line
        self.stop_column = ctx.stop.column
