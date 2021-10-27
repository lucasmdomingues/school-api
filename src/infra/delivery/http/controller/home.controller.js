export class HomeController {
  async index(req, res) {
    return res.json({ ping: 'pong' });
  }
}
