// fetch prices from url
export class Datasource {
  // Datasource class not implemented
  //initialize constructor with url
  constructor(private url: string) {
  }

  //fetch prices from url
  async fetchPrices() {
    const response = await fetch(this.url);
    return await response.json();
  }

  //get prices
  async getPrices() {
    return await this.fetchPrices();
  }
}
