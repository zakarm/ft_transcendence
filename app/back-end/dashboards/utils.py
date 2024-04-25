from game.models import Match
from datetime import datetime, timedelta
from django.db.models import F, Q

def get_total_games(obj):
    user_matches_as_one = Match.objects.filter(user_one=obj)
    user_matches_as_two = Match.objects.filter(user_two=obj)
    return user_matches_as_one.count() + user_matches_as_two.count()
        
def get_win_games(obj):
    win_matches_as_one = Match.objects.filter(user_one =
                                              obj).filter(score_user_one__gt =
                                                          F('score_user_two')).count()
    win_matches_as_two = Match.objects.filter(user_two =
                                              obj).filter(score_user_two__gt =
                                                          F('score_user_one')).count()
    return win_matches_as_one + win_matches_as_two

def get_lose_games(obj):
    lose_matches_as_one = Match.objects.filter(user_one =
                                               obj).filter(score_user_one__lt =
                                                           F('score_user_two')).count()
    lose_matches_as_two = Match.objects.filter(user_two = obj).filter(score_user_two__lt =
                                                                      F('score_user_one')).count()
    return lose_matches_as_one + lose_matches_as_two

def get_monthly_game_stats(obj):
    win_month = []
    lose_month = []
    current_year = datetime.now().year
    current_month = datetime.now().month
    start_date = datetime(current_year, current_month, 1) - timedelta(days=6*30)
    months = [(start_date + timedelta(days=30*i)).strftime('%B') for i in range(1, 7)]
    for i in range(1, 7):
        month = (current_month - i) % 12 + 1
        win = (
            Match.objects.filter(
                Q(user_one=obj) &
                Q(score_user_one__gt=F('score_user_two')) &
                Q(match_start__month=month) &
                Q(match_start__year=current_year)
            ).count()
            +
            Match.objects.filter(
                Q(user_two=obj) &
                Q(score_user_two__gt=F('score_user_one')) &
                Q(match_start__month=month) &
                Q(match_start__year=current_year)
            ).count()
        )
        win_month.insert(0, win)
        lose = (
            Match.objects.filter(
                Q(user_one=obj) &
                Q(score_user_one__lt=F('score_user_two')) &
                Q(match_start__month=month) &
                Q(match_start__year=current_year)
            ).count()
            +
            Match.objects.filter(
                Q(user_two=obj) &
                Q(score_user_two__lt=F('score_user_one')) &
                Q(match_start__month=month) &
                Q(match_start__year=current_year)
            ).count()
        )
        lose_month.insert(0, lose)
    return {'months': months, 'win': win_month, 'lose': lose_month}

def get_total_minutes(obj):
    current_year = datetime.now().year
    current_month = datetime.now().month
    start_date = datetime(current_year, current_month, 1) - timedelta(days=6 * 30)
    months = [(start_date + timedelta(days=30 * i)).strftime('%B') for i in range(1, 7)]
    minutes_months = []

    for i in range(1, 7):
        month = (current_month - i) % 12 + 1
        matches = Match.objects.filter(
            Q(user_one=obj) &
            Q(match_start__month=month) &
            Q(match_start__year=current_year)
        )

        match_durations = []
        for match in matches:
            match_duration = match.match_end - match.match_start
            match_durations.append(match_duration.total_seconds() / 60)

        matches = Match.objects.filter(
            Q(user_two=obj) &
            Q(match_start__month=month) &
            Q(match_start__year=current_year)
        )

        for match in matches:
            match_duration = match.match_end - match.match_start
            match_durations.append(match_duration.total_seconds() / 60)

        total_minutes = sum(match_durations)
        minutes_months.insert(0, int(total_minutes))

    return {"months": months, "minutes_months": minutes_months}
