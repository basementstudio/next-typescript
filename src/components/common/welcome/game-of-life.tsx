import { useEffect, useRef, useState } from 'react'

function debounce(func: any, timeout = 300) {
  let timer: NodeJS.Timeout

  return (...args: any[]) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      /* @ts-ignore */
      func.apply(this, args)
    }, timeout)
  }
}

function random(s: number, st = 0) {
  return ~~(Math.random() * s + st)
}

function initGrid(w: number, h: number) {
  const map: boolean[][] = []
  for (let i = 0; i < w; ++i) {
    map[i] = Array(h).fill(false)
  }
  for (let i = 0, l = (w * h) / 12; i < l; ++i) {
    map[random(w)][random(h)] = true
  }
  if (w > 10 && h > 10) {
    for (let i = 0; i < 10; ++i) {
      let px = random(w - 10)
      let py = random(h - 10)
      // Glider
      map[px][py] =
        map[px + 1][py + 1] =
        map[px + 1][py + 2] =
        map[px + 2][py + 0] =
        map[px + 2][py + 1] =
          true

      px = random(w - 10)
      py = random(h - 10)
      // MWSS
      map[px + 1][py] =
        map[px + 2][py] =
        map[px + 3][py] =
        map[px + 4][py] =
        map[px + 5][py] =
        map[px][py + 1] =
        map[px + 5][py + 1] =
        map[px + 5][py + 2] =
        map[px][py + 3] =
        map[px + 4][py + 3] =
        map[px + 2][py + 4] =
          true
    }
  }
  return map
}

const GameOfLife = () => {
  const pauseRef = useRef(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [windowSize, rerender] = useState(0)
  const dark = true

  useEffect(() => {
    const setState = debounce(() => {
      rerender((s) => s + 1)
    }, 800)
    const onResize = () => {
      // fade-out animation
      if (!pauseRef.current) {
        const canvas = canvasRef.current
        if (canvas) canvas.style.opacity = '0'
        pauseRef.current = true
      }
      setState()
    }

    window.addEventListener('resize', onResize, false)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) return

    pauseRef.current = false

    setTimeout(() => {
      // fade-in animation
      if (canvas) canvas.style.opacity = '1'
    }, 300)

    let timeout: NodeJS.Timeout | null = null
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const context = canvas.getContext('2d')!

    // pervent overflow-x when scrollbar is shown
    // https://stackoverflow.com/questions/8339377/how-to-get-screen-width-without-minus-scrollbar
    const width = window.document.body.clientWidth
    const height = window.innerHeight

    const size = Math.max(width, height)
    const tile = size < 4000 ? 12 : 20
    const sw = ~~(width / tile)
    const sh = ~~(height / tile)

    canvas.width = width
    canvas.height = height

    function drawGrid(grid: boolean[][]) {
      if (pauseRef.current) return grid
      const map = []
      for (let i = 0; i < sw; ++i) {
        const row = Array(sh).fill(false)
        map[i] = row
        for (let j = 0; j < sh; ++j) {
          // generate
          // @ts-ignore
          let cnt = !!grid[i][j - 1] + !!grid[i][j + 1]
          if (i > 0) {
            cnt +=
              // @ts-ignore
              !!grid[i - 1][j - 1] + !!grid[i - 1][j + 1] + !!grid[i - 1][j]
          }
          if (i < sw - 1) {
            cnt +=
              // @ts-ignore
              !!grid[i + 1][j - 1] + !!grid[i + 1][j + 1] + !!grid[i + 1][j]
          }

          if (grid[i][j]) {
            if (cnt < 2) row[j] = false
            else if (cnt < 4) row[j] = true
            else row[j] = false
          } else {
            if (cnt === 3) row[j] = true
            else row[j] = false
          }

          // draw
          context.fillStyle = row[j] ? '#111' : 'rgba(0,0,0,.5)'

          context.fillRect(i * tile, j * tile, tile, tile)
        }
      }
      return map
    }

    function run(map: boolean[][]) {
      timeout = setTimeout(() => run(drawGrid(map)), 130)
    }

    run(initGrid(sw, sh))

    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [dark, windowSize])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        top: 0,
        left: 0,
        bottom: 0,
        opacity: 0,
        transition: 'opacity 1.2s ease',
        zIndex: 0
      }}
    />
  )
}

export default GameOfLife
