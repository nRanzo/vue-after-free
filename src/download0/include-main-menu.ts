// Helper to safely include the main menu without crashing if the file is missing or corrupt.
export function safeIncludeMainMenu (context: string = 'unknown'): boolean {
  try {
    include('main-menu.js')
    return true
  } catch (e) {
    const err = e as Error
    log('ERROR loading main-menu.js [' + context + ']: ' + err.message)
    if (err.stack) {
      log(err.stack)
    }

    // Minimal fallback UI to keep the app responsive and guide recovery.
    try {
      jsmaf.root.children.length = 0

      // Basic styles to keep text readable
      new Style({ name: 'fallbackTitle', color: 'white', size: 32 })
      new Style({ name: 'fallbackText', color: 'white', size: 22 })

      const title = new jsmaf.Text()
      title.text = 'main-menu.js missing or unreadable'
      title.x = 200
      title.y = 200
      title.style = 'fallbackTitle'
      jsmaf.root.children.push(title)

      const body = new jsmaf.Text()
      body.text = 'Restore /download0/main-menu.js (or from save ZIP)\nthen restart the app.'
      body.x = 200
      body.y = 260
      body.style = 'fallbackText'
      jsmaf.root.children.push(body)
    } catch (uiErr) {
      log('Fallback UI render failed: ' + (uiErr as Error).message)
    }

    return false
  }
}
