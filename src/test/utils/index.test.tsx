import { truncateChar } from "../../utils";

describe('Utils', () => {
  it('Should truncateChar correctly', () => {
    const shortChar = 'Sample of short char';

    const result = truncateChar(shortChar, 100);
    expect(result).toBe(shortChar);

    const longChar = "Sample of long char, lorem ipsum dolor sit amet";
    const longResult = truncateChar(longChar, 20);
    expect(longResult).toHaveLength(23)
  })
})