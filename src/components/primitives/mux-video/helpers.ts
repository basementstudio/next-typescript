import type THls from 'hls.js'

export const supportsHls = (videoElm: HTMLVideoElement) =>
  videoElm.canPlayType('application/vnd.apple.mpegurl')

/* 
  This func only works if the levels array is ordered
  by resolution from lowest to highest.
*/
export const getMostSuitableResolution = (
  videoHeight: number,
  levels: THls['levels'],
  allowVideoStretching = true
) => {
  const mostSuitableResolution = levels.reduce(
    ({ level: prevLevel, idx: prevIdx }, level, idx) => {
      if (idx === null || prevLevel === null) return { level, idx }

      const newdiff = level.height - videoHeight
      const prevDiff = prevLevel.height - videoHeight

      /* 
        This is true if the prev video res is lower than the
        video height and stretching is not allowed.
      */
      const prioritizeTheHighestValue = !allowVideoStretching && prevDiff < 0
      /*
        This is not valid when the videoStretching is disabled
        and the video height is lower than the video elm height.
      */
      const isDiffValid = allowVideoStretching || newdiff >= 0

      if (
        isDiffValid &&
        (prioritizeTheHighestValue || Math.abs(newdiff) < Math.abs(prevDiff))
      ) {
        return { level, idx }
      }

      return {
        level: prevLevel,
        idx: prevIdx
      }
    },
    { level: null, idx: null } as {
      level: THls['levels'][number] | null
      idx: number | null
    }
  )

  return mostSuitableResolution.idx!
}
