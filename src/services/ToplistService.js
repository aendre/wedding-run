class ToplistService {

  saveScore(playerName, score) {
    if (!playerName) {
      return;
    }
    // Implement your save logic here, e.g.:
    // fetch(Settings.urls.saveScore, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ playerName, score })
    // });
  }

  getTop10() {
    return [
      { playerName: 'AE', score: '100000' },
      { playerName: 'AE', score: '90000' },
      { playerName: 'AE', score: '80000' },
      { playerName: 'AE', score: '70000' },
      { playerName: 'AE', score: '60000' },
      { playerName: 'AE', score: '50000' },
      { playerName: 'AE', score: '40000' },
      { playerName: 'AE', score: '30000' },
      { playerName: 'AE', score: '20000' },
      { playerName: 'AE', score: '10000' }
    ];
  }
}

export default new ToplistService();
