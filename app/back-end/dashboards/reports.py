from datetime import datetime
from game.models import Match
from django.db.models import Q
import calendar

def get_minutes_per_day(obj, period):
    current_month = datetime.now().month
    current_year = datetime.now().year
    minutes_periods = []

    if period == "month":
        days_in_month = calendar.monthrange(current_year, current_month)[1]
        month_days = [(current_month, day) for day in range(1, days_in_month + 1)]
        minutes_periods = _get_minutes_per_day_for_month_days(obj, month_days)

    elif period == "3_months":
        for month_offset in range(3):
            month = current_month - month_offset
            year = current_year
            if month < 1:
                month += 12
                year -= 1
            days_in_month = calendar.monthrange(year, month)[1]
            month_days = [(month, day) for day in range(1, days_in_month + 1)]
            minutes_periods.extend(_get_minutes_per_day_for_month_days(obj, month_days))

    elif period == "year":
        for month in range(1, 13):
            days_in_month = calendar.monthrange(current_year, month)[1]
            month_days = [(month, day) for day in range(1, days_in_month + 1)]
            minutes_periods.extend(_get_minutes_per_day_for_month_days(obj, month_days))
    return minutes_periods

def _get_minutes_per_day_for_month_days(obj, month_days):
    minutes_per_day = []
    for month, day in month_days:
        matches = Match.objects.filter(
            Q(user_one=obj) &
            Q(match_start__month=month) &
            Q(match_start__year=datetime.now().year) &
            Q(match_start__day=day)
        )
        match_durations = []
        for match in matches:
            match_duration = match.match_end - match.match_start
            match_durations.append(match_duration.total_seconds() / 60)
        total_minutes = sum(match_durations)
        minutes_per_day.append((month, day, total_minutes))

    return minutes_per_day