namespace ElectricGamesApi;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class Game : IGame
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string id { get; set; } = "";
    public string title { get; set; } = "Not set";
    public string platform { get; set; } = "Not set";
    public string release_year { get; set; } = "Not set";
    public string image { get; set; } = "Not set";
}
