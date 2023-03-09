import './MealList.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import { useEffect, useState } from 'react';

const MealList = () => {
  const [meals, setMaels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpErrorMessage, setHttpErrorMessage] = useState();

  useEffect(() => {
    const fetchMaels = async () => {
      setIsLoading(true);
      const response = await fetch(
        'https://react-app-78c26-default-rtdb.firebaseio.com/meals.json'
      );

      if (!response.ok) {
        throw new Error('Что-то пошло не так');
      }

      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMaels(loadedMeals);
      setIsLoading(false);
    };

    fetchMaels().catch((err) => {
      setIsLoading(false);
      setHttpErrorMessage(err.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className="loading">
        <p>Закрузка даних з сервера...</p>
      </section>
    );
  }

  if (httpErrorMessage) {
    return (
      <section className="error">
        <p>{httpErrorMessage}</p>
      </section>
    );
  }

  const mealList = meals.map((el) => (
    <MealItem
      key={el.id}
      id={el.id}
      name={el.name}
      description={el.description}
      price={el.price}
    />
  ));

  return (
    <section className="meals">
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
};

export default MealList;
