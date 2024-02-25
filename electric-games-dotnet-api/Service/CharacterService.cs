using ElectricGamesApi.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace ElectricGamesApi.Services;

public class CharacterService
{
    private readonly IMongoCollection<Character> _characterCollection;

    public CharacterService(
        IOptions<ElectricGamesDBSettings> ElectricGamesDBSettings)
    {
        var mongoClient = new MongoClient(
            ElectricGamesDBSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            ElectricGamesDBSettings.Value.DatabaseName);

        _characterCollection = mongoDatabase.GetCollection<Character>(
            ElectricGamesDBSettings.Value.CharacterCollection);
    }

    public List<Character> Get() {
        return _characterCollection.Find(_ => true).ToList();
    }

    public Character? Get(string id) {
        return _characterCollection.Find(x => x.id == id).FirstOrDefault();
    }

    public void Create(Character newCharacter) {
        _characterCollection.InsertOne(newCharacter);
    }

    public void Update(string id, Character updatedCharacter) {
        _characterCollection.ReplaceOne(x => x.id == id, updatedCharacter);
    }

    public void Remove(string id) {
        _characterCollection.DeleteOne(x => x.id == id);
    }
}