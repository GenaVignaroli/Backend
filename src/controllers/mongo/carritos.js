const {CarritosModel} = require(`../../models/carritos`)

const bodyCarrito = async (req, res, next) => {
    const { id, productos } = req.body;

    if (!id || !productos)
        return res.status(400).json({
            msg: `Campos incompletos`,
        });

    next();
}

const getCarritos = async (req, res) => {
    try{
        const items = await ProductosModel.find(query)

        res.json({
            data: items,
        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
};

const crearCarrito = async (req, res) => {
    try{
    
        const nuevoProducto = await ProductosModel.create({

        });

        res.json({
            data: nuevoProducto,
        });
    }catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
};

const cargarProductos = async (req, res) => {
    try{
        const {productos} = req.body;
        const {id} = req.params;

        const query = {}
        if(id)
            query.id = id;

            const item = await ProductosModel.findById(query)

        const nuevoProducto = await ProductosModel.create({
            productos,
        });

        const carritoCargado = item.push(nuevoProducto);

        res.json({
            data: carritoCargado,
        })
    }catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
};

const actualizarCarrito = async (req, res) =>{
    try{
        const{id} = req.params;
        const { productos} = req.body;

        let item = await ProductosModel.findById(id);

        if(!item)
        return res.status(404).json({
            msg: `Producto no encontrado`
        });

        const productoActualizado = await ProductosModel.findByIdAndUpdate(
            id,
            {productos},
            {new: true}
        );

        res.json({
            msg: `Productos  actualizado!`,
            data: productoActualizado
        });
    }catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
};

const borrarCarrito = async (req, res) => {
    try {
      const { id } = req.params;
  
      await ProductosModel.findByIdAndDelete(id);
  
      res.json({
        msg: 'Producto borrado',
      });
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  };

module.exports = {
    bodyCarrito,
    getCarritos,
    crearCarrito,
    cargarProductos,
    actualizarCarrito,
    borrarCarrito,
}
