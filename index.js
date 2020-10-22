import EzoModule from './moxis';
import Products from './components/products';
import Services from './components/services';

EzoModule.add('products', Products);
EzoModule.add('services', Services);

EzoModule.run();
