export type arrayOfDateStrings = Array<string>;

export type mainDataForChart = {
    value: number,
}

export type ourLogChart = {
    data: mainDataForChart,
    ctx: CanvasRenderingContext2D,
}