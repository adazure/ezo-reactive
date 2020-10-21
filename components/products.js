export default function () {
  this.getAllProducts = function () { console.log('Tüm ürünler getirildi'); }
  this.removeAllProducts = function () { console.log('Tüm ürünler silindi'); }
  this.removeAtProductWithIndex = function (index) { console.log('Belirli bir ürün silindi'); }
  this.addProduct = function (product) { console.log('Ürün eklendi'); }
}