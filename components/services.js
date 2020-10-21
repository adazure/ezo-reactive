export default function ({ useReady, useDispose, useTemplate }) {
  this.getAllServices = function () { console.log('Tüm servisler getirildi'); }
  this.removeAllServices = function () { console.log('Tüm servisler silindi'); }
  this.removeAtServiceWithIndex = function (index) { console.log('Belirli bir servis silindi'); }
  this.addService = function (product) { console.log('Servis eklendi'); }

  useReady(() => {
    this.$.products.addProduct();
    console.log(this.select('.lblname'));
  });

  useTemplate(`
    <div id="temp">
      <ul>
        <li><label class="lblname">Name</label></li>
        <li><input type="text" name="name" /></li>
      </ul>
    </div>
  `);
  useDispose(() => {

  });
}