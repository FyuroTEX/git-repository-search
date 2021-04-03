import VirtualService from './VirtualService';

export default class Github extends VirtualService {
  constructor() {
    super();
    this.url =
      'https://api.github.com/search/repositories?sort=stars&per_page=30';
    this.controller = new AbortController();
  }

  get(search, page = 1) {
    // this.abort();

    const searchTransform = search.trim().split(' ').join('+');

    return fetch(`${this.url}&q=${searchTransform}&page=${page}`, {
      signal: this.controller.signal,
    });
  }

  abort() {
    this.controller.abort();
  }
}
