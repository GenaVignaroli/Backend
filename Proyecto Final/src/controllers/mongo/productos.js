const {ProductosModel} = require(`../../models/productos`)

const bodyProducto = async (req, res, next) => {
    const { id, nombre, descripcion, precio, stock } = req.body;

    if (!id ||!nombre || !descripcion || !precio || !stock)
        return res.status(400).json({
            msg: `Campos incompletos`,
        });

    next();
}

const getProductos = async (req, res) => {
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

const getProductosById = async (req, res) =>  {
    try{
        const {id} = req.params;

        const query = {}
        if(id)
            query.id = id;

            const item = await ProductosModel.findById(query)

            res.json({
                data: item,
            });
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
};

const cargarProductos = async (req, res) => {
    try{
        const {nombre, descripcion, precio, stock} = req.body;

        const nuevoProducto = await ProductosModel.create({
            nombre,
            descripcion, 
            precio,
            stock,
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

const actualizarProducto = async (req, res) =>{
    try{
        const{id} = req.params;
        const {nombre, descripcion, precio, stock} = req.body;

        let item = await ProductosModel.findById(id);

        if(!item)
        return res.status(404).json({
            msg: `Producto no encontrado`
        });

        const productoActualizado = await ProductosModel.findByIdAndUpdate(
            id,
            {nombre, descripcion, stock, precio},
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

const borrarProducto = async (req, res) => {
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
    bodyProducto,
    getProductos,
    getProductosById,
    cargarProductos,
    actualizarProducto,
    borrarProducto,
}


