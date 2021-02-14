class RequestBuilder0 {
  private data: object | null = null;
  private method: 'get' | 'post' | null = null;
  private url: string | null = null;

  setMethod(method: 'get' | 'post'): this {
    this.method = method;
    return this;
  }
  setData(data: object): this {
    this.data = data;
    return this;
  }
  setURL(url: string): this {
    this.url = url;
    return this;
  }
  send() {
    // ... }
  }
}
new RequestBuilder0()
  .setURL('/users')
  .setMethod('get')
  .setData({ firstName: 'Anna' })
  .send();

// 少なくともURLとメソッドの設定が終わるまでは.sendを呼び出せないことをコンパイル時に保 証します。
// メソッドを特定の順序で呼び出すことをユーザーに強制したら、
// これを保証することは容易に なるでしょうか?(ヒント:this の代わりに何を返せるでしょうか?)
class RequestBuilder {
  protected data: object | null = null;
  protected method: 'get' | 'post' | null = null;
  protected url: string | null = null;
  setMethod(method: 'get' | 'post'): RequestBuilderWithMethod {
    return new RequestBuilderWithMethod().setMethod(method).setData(this.data);
  }
  setData(data: object | null): this {
    this.data = data;
    return this;
  }
}

class RequestBuilderWithMethod extends RequestBuilder {
  setMethod(method: 'get' | 'post' | null): this {
    this.method = method;
    return this;
  }
  setURL(url: string): RequestBuilderWithMethodAndURL {
    return new RequestBuilderWithMethodAndURL()
      .setMethod(this.method)
      .setURL(url)
      .setData(this.data);
  }
}

class RequestBuilderWithMethodAndURL extends RequestBuilderWithMethod {
  setURL(url: string): this {
    this.url = url;
    return this;
  }
  send() {
    // ...
  }
}

new RequestBuilder()
  .setMethod('get')
  .setData({ a: 1 })
  .setURL('foo.com')
  .send();

// ユーザーがメソッドを任意の順序で呼び出せるようにしたまま、
// これを保証したいと したら、設計をどのように変更すればよいでしょうか?

interface BuildableRequest {
  data?: object;
  method: 'get' | 'post';
  url: string;
}

class RequestBuilder2 {
  data?: object;
  method?: 'get' | 'post';
  url?: string;
  setData(data: object): this & Pick<BuildableRequest, 'data'> {
    return Object.assign(this, { data });
  }
  setMethod(method: 'get' | 'post'): this & Pick<BuildableRequest, 'method'> {
    return Object.assign(this, { method });
  }
  setURL(url: string): this & Pick<BuildableRequest, 'url'> {
    return Object.assign(this, { url });
  }
  // buildを呼び出す際にthisの型をチェクする
  // 例えばbuildを呼ぶ前にsetMethodを呼ばなかった場合、thisにmethodが存在しないため
  // BuildableRequest型に対する方エラーが発生する
  // つまりBuildableRequest型を網羅していない場合はbuildはエラーを出す
  build(this: BuildableRequest) {
    return this;
  }
}
new RequestBuilder2().setData({}).setMethod('post').setURL('bar').build();
