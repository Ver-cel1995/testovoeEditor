import React, {useEffect, useState} from 'react';
import './App.css';


export type Param = {
    id: string;
    name: string;
    type: 'string';
};

export type Model = {
    id: number;
    name: string;
    brand: string;
    color: string;
};

const App = () => {
    useEffect(() => {
        alert('Я думал добавить загрузку фото и менять цвет в зависимости от модели или наоборот. Подключить бы redux и вообще было бы кайф программировать :).' +
            'Кстати задачка интересная, т.к. меня по другому учили менять состояние параметров, НО прикольно, мне понравилось :)' +
            ' не понятно только одно, зачем писать код в одном файле...? По началу это меня прям сбило с толку )')
    }, [])


    const params: Param[] = [
        { id: 'name', name: 'Название', type: 'string' },
        { id: 'brand', name: 'Бренд', type: 'string' },
        { id: 'color', name: 'Цвет', type: 'string' },
    ];

    const [initialModel, setInitialModel] = useState<Model[]>([
        { id: 1, name: 'Телефон', brand: 'Xiaomi', color: 'Чёрный' },
    ]);

    const editorSetting = (model: Model) => {
        setInitialModel([model]);
    };

    return (
        <div className="app">
            <h1 className="app-title">Редактор товаров</h1>
            <Cards model={initialModel} params={params} editorSetting={editorSetting} />
        </div>
    );
};

export default App;

type Props = {
    model: Model[];
    params: Param[];
    editorSetting: (model: Model) => void;
};

const Cards = ({ model, params, editorSetting }: Props) => {
    const [modal, setModal] = useState(false);
    const [editedModel, setEditedModel] = useState<Model>({ ...model[0] });

    const handleChange = (key: keyof Model, value: string) => {
        setEditedModel((prev) => ({ ...prev, [key]: value }));
    };

    const getModel = (): Model => {
        return editedModel;
    };

    const handleSave = () => {
        const updated = getModel();
        console.log(updated);
        setModal(false);
        editorSetting(updated);
    };

    return (
        <div className="product-card">
            <div className="product-card-content">
                {model.map((el) => (
                    <div key={el.id}>
                        <h2 className="product-card-name">{el.name}</h2>
                        <p className="product-card-brand">{el.brand}</p>
                        <p className="product-card-color">{el.color}</p>
                    </div>
                ))}
                <button className="product-card-edit-btn" onClick={() => setModal(true)}>
                    Редактировать
                </button>
            </div>

            {modal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3 className="modal-title">Редактирование</h3>
                        {params.map((param) => (
                            <div key={param.id}>
                                <label>{param.name}</label>
                                <input
                                    type="text"
                                    value={editedModel[param.id as keyof Model]}
                                    onChange={(e) =>
                                        handleChange(param.id as keyof Model, e.target.value)
                                    }
                                />
                            </div>
                        ))}

                        <button className="modal-save-btn" onClick={handleSave}>
                            Сохранить
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
