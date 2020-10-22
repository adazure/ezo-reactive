export default function ({ useTemplate, useData }) {


  this.getAllProducts = function () { console.log('Tüm ürünler getirildi'); }

  this.removeAllProducts = function () { console.log('Tüm ürünler silindi'); }

  this.removeAtProductWithIndex = function (index) { console.log('Belirli bir ürün silindi'); }

  this.addProduct = function (product) { console.log('Ürün eklendi'); }

  this.sendClick = function () {
    useData({ inputValue: 'Başardık sanıyorum' });
  }

  useTemplate(`
    <div id="template">
      <input type="text" use-value="data.inputValue" />
      <button type="submit" use-text="data.buttonText" use-click="sendClick">Send</button>
    </div>
  `)

  useData({
    inputValue: 'Nasılsın',
    buttonText: 'Send Your Information'
  });

}