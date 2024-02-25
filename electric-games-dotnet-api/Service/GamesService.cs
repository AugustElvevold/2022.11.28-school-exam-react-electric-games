using ElectricGamesApi.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace ElectricGamesApi.Services;

public class GamesService
{
    private readonly IMongoCollection<Game> _gamesCollection;

    public GamesService(
        IOptions<ElectricGamesDBSettings> ElectricGamesDBSettings)
    {
        var mongoClient = new MongoClient(
            ElectricGamesDBSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            ElectricGamesDBSettings.Value.DatabaseName);

        _gamesCollection = mongoDatabase.GetCollection<Game>(
            ElectricGamesDBSettings.Value.GamesCollection);
    }

    public List<Game> Get() {
        return _gamesCollection.Find(_ => true).ToList();
    }

    public Game? Get(string id) {
        return _gamesCollection.Find(x => x.id == id).FirstOrDefault();
    }

    public void Create(Game newGame) {
        _gamesCollection.InsertOne(newGame);
    }

    public void Update(string id, Game updatedGame) {
        _gamesCollection.ReplaceOne(x => x.id == id, updatedGame);
    }

    public void Remove(string id) {
        _gamesCollection.DeleteOne(x => x.id == id);
    }
}