
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Search, Filter, Plus } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PostCard from "@/components/community/PostCard";

// Mock community data
const mockPosts = [
  {
    id: "1",
    author: {
      id: "user1",
      name: "John Farmer",
      avatar: "https://i.pravatar.cc/150?img=1",
      isExpert: false,
    },
    title: "How to manage tomato leaf curl virus?",
    content: "I've noticed some curling on my tomato plants and suspect it might be a virus. The leaves are curling upward and inward, and some have yellow discoloration. I've tried adjusting watering and fertilizer but it doesn't seem to help. Has anyone dealt with this before? What treatments worked for you?",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    tags: ["Disease", "Tomatoes", "Virus"],
    likes: 15,
    comments: [
      {
        id: "c1",
        author: {
          id: "user2",
          name: "Dr. Plant Expert",
          avatar: "https://i.pravatar.cc/150?img=2",
          isExpert: true,
        },
        content: "This sounds like Tomato Yellow Leaf Curl Virus (TYLCV). It's spread by whiteflies. First, isolate the affected plants to prevent spread. Remove severely infected plants. Use yellow sticky traps to catch whiteflies. Apply neem oil to remaining plants. For future seasons, use resistant varieties.",
        createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
        isVerified: true,
        likes: 8,
      },
      {
        id: "c2",
        author: {
          id: "user3",
          name: "Sarah Gardener",
          avatar: "https://i.pravatar.cc/150?img=3",
          isExpert: false,
        },
        content: "I dealt with this last season. The expert advice is spot on. I'd add that mulching helped prevent soil splash which can spread some diseases. Also, I found that providing afternoon shade during the hottest days seemed to reduce stress on the plants.",
        createdAt: new Date(Date.now() - 1000 * 60 * 10), // 10 mins ago
        isVerified: false,
        likes: 3,
      },
    ],
  },
  {
    id: "2",
    author: {
      id: "user4",
      name: "Maria Rodriguez",
      avatar: "https://i.pravatar.cc/150?img=4",
      isExpert: false,
    },
    title: "Best natural methods for aphid control?",
    content: "My pepper plants are being attacked by aphids. I prefer to avoid chemical pesticides as I'm trying to maintain an organic garden. What are your favorite natural methods for controlling aphids? I've tried spraying with water but they keep coming back.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    tags: ["Pests", "Organic", "Peppers"],
    likes: 28,
    comments: [
      {
        id: "c3",
        author: {
          id: "user5",
          name: "Alex Organic",
          avatar: "https://i.pravatar.cc/150?img=5",
          isExpert: false,
        },
        content: "Ladybugs are your best friends! I release them in my garden and they devour aphids. You can buy them online or at garden centers. Also, try planting companion plants like marigolds, nasturtiums, and alliums which help repel aphids naturally.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
        isVerified: false,
        likes: 12,
      },
      {
        id: "c4",
        author: {
          id: "user6",
          name: "Organic Farm Advisor",
          avatar: "https://i.pravatar.cc/150?img=6",
          isExpert: true,
        },
        content: "I recommend a homemade spray of 1 tablespoon of dish soap to 1 quart of water. Spray directly on the aphids. The soap breaks down their protective coating, causing dehydration. Apply in the evening when beneficial insects are less active. Repeat every 5-7 days as needed.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        isVerified: true,
        likes: 15,
      },
    ],
  },
  {
    id: "3",
    author: {
      id: "user7",
      name: "James Smith",
      avatar: "https://i.pravatar.cc/150?img=7",
      isExpert: false,
    },
    title: "Irrigation recommendations for drought conditions",
    content: "We're experiencing drought conditions in my region, and I need to optimize my irrigation system. Currently using drip irrigation but looking for advice on scheduling and water conservation techniques that won't compromise yield. Any suggestions from farmers in similar climates?",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    tags: ["Irrigation", "Drought", "Water Conservation"],
    likes: 32,
    comments: [
      {
        id: "c5",
        author: {
          id: "user8",
          name: "Dr. Irrigation Systems",
          avatar: "https://i.pravatar.cc/150?img=8",
          isExpert: true,
        },
        content: "Drip irrigation is already a great start. I recommend adding a smart controller that adjusts based on weather data and soil moisture sensors. Water deeply but infrequently to encourage deeper root growth. Apply mulch (3-4 inches) to reduce evaporation. Consider deficit irrigation techniques during non-critical growth stages.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 22), // 22 hours ago
        isVerified: true,
        likes: 20,
      },
    ],
  },
  {
    id: "4",
    author: {
      id: "user9",
      name: "Emily Johnson",
      avatar: "https://i.pravatar.cc/150?img=9",
      isExpert: false,
    },
    title: "Cover crop recommendations for corn rotation",
    content: "I'm looking for cover crop recommendations to plant after harvesting corn. My goals are to improve soil structure, add nitrogen, and prevent erosion. I'm in the Midwest with relatively cold winters. What has worked well in similar conditions?",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    tags: ["Cover Crops", "Soil Health", "Corn"],
    likes: 24,
    comments: [],
  },
];

const categories = [
  "All Posts",
  "Crop Management",
  "Soil Health",
  "Pest Control",
  "Disease Management",
  "Weather",
  "Technology",
  "Irrigation",
  "Livestock",
  "Markets",
];

const popularTags = [
  "Organic",
  "Sustainability",
  "Soil Health",
  "Irrigation",
  "Pest Management",
  "Weather",
  "Crops",
  "Technology",
  "Market Trends",
];

const Community = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Posts");
  const [posts, setPosts] = useState(mockPosts);
  const [activeTab, setActiveTab] = useState("posts");

  const filteredPosts = posts.filter((post) => {
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      return (
        post.title.toLowerCase().includes(searchTermLower) ||
        post.content.toLowerCase().includes(searchTermLower) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchTermLower))
      );
    }
    if (selectedCategory !== "All Posts") {
      return post.tags.some((tag) => tag === selectedCategory);
    }
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="ag-container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Farmer Community</h1>
            <p className="text-muted-foreground max-w-2xl">
              Connect with fellow farmers and experts, share knowledge, and find solutions to your farming challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search discussions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button className="bg-community-dark hover:bg-community-darker text-white flex items-center gap-2">
                  <Filter className="h-4 w-4" /> Filter
                </Button>
                <Button className="bg-soil-dark hover:bg-soil-darker text-white flex items-center gap-2">
                  <Plus className="h-4 w-4" /> New Post
                </Button>
              </div>

              <Tabs defaultValue="popular" className="mb-6">
                <TabsList>
                  <TabsTrigger value="popular">Popular</TabsTrigger>
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                  <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
                </TabsList>
              </Tabs>

              {filteredPosts.length > 0 ? (
                <div className="space-y-4">
                  {filteredPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center">
                  <CardContent>
                    <div className="mb-4 mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                      <Search className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">No posts found</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mb-4">
                      We couldn't find any posts matching your search criteria. Try adjusting your filters or create a new post.
                    </p>
                    <Button className="bg-soil-dark hover:bg-soil-darker text-white">
                      Create New Post
                    </Button>
                  </CardContent>
                </Card>
              )}

              {filteredPosts.length > 4 && (
                <div className="mt-6 flex justify-center">
                  <Button variant="outline">Load More</Button>
                </div>
              )}
            </div>

            <div>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="posts">Categories</TabsTrigger>
                  <TabsTrigger value="create">New Post</TabsTrigger>
                </TabsList>
                
                <TabsContent value="posts">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle>Categories</CardTitle>
                      <CardDescription>
                        Browse discussions by topic
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {categories.map((category, i) => (
                          <button
                            key={i}
                            className={`w-full text-left px-3 py-1.5 text-sm rounded-md transition-colors ${
                              selectedCategory === category
                                ? "bg-community-light text-community-darker font-medium"
                                : "hover:bg-muted"
                            }`}
                            onClick={() => setSelectedCategory(category)}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="mt-6">
                    <CardHeader className="pb-3">
                      <CardTitle>Popular Tags</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {popularTags.map((tag, i) => (
                          <Badge
                            key={i}
                            variant="secondary"
                            className="cursor-pointer hover:bg-muted"
                            onClick={() => setSearchTerm(tag)}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="mt-6">
                    <CardHeader className="pb-3">
                      <CardTitle>Expert Farmers</CardTitle>
                      <CardDescription>
                        Top contributors with verified expertise
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
                              <img
                                src={`https://i.pravatar.cc/150?img=${i + 10}`}
                                alt="Expert"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="flex items-center">
                                <span className="font-medium">Expert Name</span>
                                <Badge variant="outline" className="ml-2 bg-blue-100 text-blue-800 text-xs py-0">Expert</Badge>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                Specialty: Soil Health, Organic Farming
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="create">
                  <Card>
                    <CardHeader>
                      <CardTitle>Create New Post</CardTitle>
                      <CardDescription>
                        Share your question or knowledge with the community
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-4">
                        <div className="space-y-2">
                          <label htmlFor="post-title" className="text-sm font-medium">
                            Title
                          </label>
                          <Input
                            id="post-title"
                            placeholder="Enter a descriptive title for your post"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="post-content" className="text-sm font-medium">
                            Content
                          </label>
                          <Textarea
                            id="post-content"
                            placeholder="Describe your question or share your knowledge..."
                            rows={6}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="post-tags" className="text-sm font-medium">
                            Tags
                          </label>
                          <Input
                            id="post-tags"
                            placeholder="Add tags separated by commas (e.g., Tomatoes, Disease, Organic)"
                          />
                          <p className="text-xs text-muted-foreground">
                            Adding relevant tags helps others find your post
                          </p>
                        </div>
                        
                        <div className="pt-2">
                          <Button className="w-full bg-soil-dark hover:bg-soil-darker text-white">
                            Post to Community
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Community;
