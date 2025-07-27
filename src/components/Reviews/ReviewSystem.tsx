import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  Flag, 
  Calendar,
  User,
  CheckCircle
} from "lucide-react";

interface Review {
  id: string;
  author: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  rating: number;
  comment: string;
  date: Date;
  project: string;
  helpful: number;
  notHelpful: number;
  userVote?: "helpful" | "not-helpful";
}

interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  ratingDistribution: { [key: number]: number };
}

export function ReviewSystem() {
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const stats: ReviewStats = {
    totalReviews: 127,
    averageRating: 4.8,
    ratingDistribution: {
      5: 89,
      4: 24,
      3: 8,
      2: 4,
      1: 2
    }
  };

  const reviews: Review[] = [
    {
      id: "1",
      author: {
        name: "María González",
        avatar: "/placeholder.svg",
        verified: true
      },
      rating: 5,
      comment: "Excelente trabajo! Ana superó todas mis expectativas. El logo quedó perfecto y exactamente como lo había imaginado. Su atención al detalle es impresionante y la comunicación fue fluida durante todo el proceso. Definitivamente la recomiendo y la volvería a contratar.",
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      project: "Diseño de Logo",
      helpful: 12,
      notHelpful: 0,
      userVote: "helpful"
    },
    {
      id: "2",
      author: {
        name: "Carlos Mendoza",
        avatar: "/placeholder.svg",
        verified: true
      },
      rating: 5,
      comment: "Trabajar con Ana fue una experiencia fantástica. Entregó el proyecto antes del tiempo acordado y con una calidad excepcional. Su creatividad y profesionalismo son de primer nivel. Ya estamos planeando nuestro próximo proyecto juntos.",
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      project: "Branding Completo",
      helpful: 8,
      notHelpful: 1
    },
    {
      id: "3",
      author: {
        name: "Sofia Martinez",
        avatar: "/placeholder.svg",
        verified: false
      },
      rating: 4,
      comment: "Muy buen trabajo en general. Ana es muy talentosa y profesional. El único punto a mejorar sería la comunicación en las primeras etapas del proyecto, pero una vez que empezamos a trabajar juntas todo fluyó perfecto.",
      date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
      project: "Diseño Web",
      helpful: 5,
      notHelpful: 2
    }
  ];

  const handleVote = (reviewId: string, voteType: "helpful" | "not-helpful") => {
    // Aquí iría la lógica para votar por una reseña
    console.log(`Voting ${voteType} for review ${reviewId}`);
  };

  const submitReview = () => {
    if (newRating > 0 && newReview.trim()) {
      // Aquí iría la lógica para enviar la reseña
      console.log({
        rating: newRating,
        comment: newReview
      });
      setNewReview("");
      setNewRating(0);
      setShowReviewForm(false);
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "Hace 1 día";
    if (diffDays < 7) return `Hace ${diffDays} días`;
    if (diffDays < 30) return `Hace ${Math.ceil(diffDays / 7)} semana${Math.ceil(diffDays / 7) > 1 ? 's' : ''}`;
    return `Hace ${Math.ceil(diffDays / 30)} mes${Math.ceil(diffDays / 30) > 1 ? 'es' : ''}`;
  };

  return (
    <div className="space-y-6">
      {/* Review Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-400" />
            Calificaciones y Reseñas
          </CardTitle>
          <CardDescription>
            {stats.totalReviews} reseñas de clientes verificados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold">{stats.averageRating}</div>
              <div className="flex justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(stats.averageRating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Basado en {stats.totalReviews} reseñas
              </p>
            </div>
            
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-2">
                  <span className="text-sm w-3">{rating}</span>
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <Progress 
                    value={(stats.ratingDistribution[rating] / stats.totalReviews) * 100} 
                    className="flex-1 h-2"
                  />
                  <span className="text-sm text-muted-foreground w-8">
                    {stats.ratingDistribution[rating]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Review */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Escribir una reseña</CardTitle>
            {!showReviewForm && (
              <Button onClick={() => setShowReviewForm(true)}>
                Escribir reseña
              </Button>
            )}
          </div>
        </CardHeader>
        {showReviewForm && (
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Calificación</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setNewRating(rating)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        rating <= newRating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300 hover:text-yellow-200"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Comentario</label>
              <Textarea
                placeholder="Comparte tu experiencia trabajando con este freelancer..."
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                rows={4}
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={submitReview}
                disabled={newRating === 0 || !newReview.trim()}
                className="bg-gradient-primary hover:opacity-90"
              >
                Publicar reseña
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowReviewForm(false)}
              >
                Cancelar
              </Button>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Todas las reseñas</h3>
        
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={review.author.avatar} />
                      <AvatarFallback>
                        {review.author.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{review.author.name}</h4>
                        {review.author.verified && (
                          <Badge variant="secondary" className="text-xs px-2">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verificado
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(review.date)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline">{review.project}</Badge>
                </div>
                
                <p className="text-muted-foreground leading-relaxed">
                  {review.comment}
                </p>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleVote(review.id, "helpful")}
                      className={`flex items-center gap-1 text-sm transition-colors ${
                        review.userVote === "helpful"
                          ? "text-green-600"
                          : "text-muted-foreground hover:text-green-600"
                      }`}
                    >
                      <ThumbsUp className="h-4 w-4" />
                      Útil ({review.helpful})
                    </button>
                    <button
                      onClick={() => handleVote(review.id, "not-helpful")}
                      className={`flex items-center gap-1 text-sm transition-colors ${
                        review.userVote === "not-helpful"
                          ? "text-red-600"
                          : "text-muted-foreground hover:text-red-600"
                      }`}
                    >
                      <ThumbsDown className="h-4 w-4" />
                      No útil ({review.notHelpful})
                    </button>
                  </div>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <Flag className="h-4 w-4 mr-1" />
                    Reportar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
